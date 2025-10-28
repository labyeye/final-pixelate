"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Star, Check, X, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Review {
  _id: string;
  name: string;
  email: string;
  brand: string;
  workDone: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
  updatedAt?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/reviews?limit=100');
      if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
      const items = await res.json();
      setReviews(items as Review[]);
    } catch (err) {
      console.error('Failed to load reviews', err);
      toast({
        title: "Error",
        description: "Failed to load reviews. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (review: Review) => {
    try {
      const res = await fetch(`/api/reviews/${review._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true })
      });

      if (!res.ok) throw new Error('Failed to approve review');

      setReviews(prev => prev.map(r => 
        r._id === review._id ? { ...r, approved: true } : r
      ));

      toast({
        title: "Success",
        description: "Review approved successfully"
      });
    } catch (err) {
      console.error('Failed to approve review', err);
      toast({
        title: "Error",
        description: "Failed to approve review",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (review: Review) => {
    try {
      const res = await fetch(`/api/reviews/${review._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false })
      });

      if (!res.ok) throw new Error('Failed to reject review');

      setReviews(prev => prev.map(r => 
        r._id === review._id ? { ...r, approved: false } : r
      ));

      toast({
        title: "Success",
        description: "Review rejected"
      });
    } catch (err) {
      console.error('Failed to reject review', err);
      toast({
        title: "Error",
        description: "Failed to reject review",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingReview) return;

    try {
      const res = await fetch(`/api/reviews/${editingReview._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingReview.name,
          email: editingReview.email,
          brand: editingReview.brand,
          workDone: editingReview.workDone,
          rating: editingReview.rating,
          message: editingReview.message,
          approved: editingReview.approved
        })
      });

      if (!res.ok) throw new Error('Failed to update review');

      setReviews(prev => prev.map(r => 
        r._id === editingReview._id ? editingReview : r
      ));

      setIsEditDialogOpen(false);
      setEditingReview(null);

      toast({
        title: "Success",
        description: "Review updated successfully"
      });
    } catch (err) {
      console.error('Failed to update review', err);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (review: Review) => {
    if (!confirm(`Are you sure you want to delete the review from ${review.name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/reviews/${review._id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete review');

      setReviews(prev => prev.filter(r => r._id !== review._id));

      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
    } catch (err) {
      console.error('Failed to delete review', err);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Manage and moderate customer testimonials
          </p>
        </div>
        <Button onClick={loadReviews} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading reviews...
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No reviews yet
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{review.brand}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.workDone}</Badge>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.message}
                  </TableCell>
                  <TableCell>
                    {review.approved ? (
                      <Badge className="bg-green-500">Approved</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!review.approved && (
                          <DropdownMenuItem onClick={() => handleApprove(review)}>
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {review.approved && (
                          <DropdownMenuItem onClick={() => handleReject(review)}>
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleEdit(review)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(review)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          {editingReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingReview.name}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingReview.email}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-brand">Brand</Label>
                  <Input
                    id="edit-brand"
                    value={editingReview.brand}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, brand: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-service">Service</Label>
                  <Select
                    value={editingReview.workDone}
                    onValueChange={(value) =>
                      setEditingReview({ ...editingReview, workDone: value })
                    }
                  >
                    <SelectTrigger id="edit-service">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video Editing">Video Editing</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="App Development">App Development</SelectItem>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Rating: {editingReview.rating} stars</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= editingReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onClick={() =>
                        setEditingReview({ ...editingReview, rating: star })
                      }
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="edit-message">Testimonial</Label>
                <Textarea
                  id="edit-message"
                  value={editingReview.message}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, message: e.target.value })
                  }
                  rows={5}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-approved"
                  checked={editingReview.approved}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, approved: e.target.checked })
                  }
                  className="rounded"
                />
                <Label htmlFor="edit-approved">Approved</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
