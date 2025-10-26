'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AboutTeamMember {
  _id?: string;
  name: string;
  designation: string;
  phone: string;
  imageUrl: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  order: number;
}

export default function AboutUsTeamPage() {
  const [members, setMembers] = useState<AboutTeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AboutTeamMember | null>(null);
  const { toast } = useToast();

  const emptyMember: AboutTeamMember = {
    name: '',
    designation: '',
    phone: '',
    imageUrl: '',
    socialLinks: {
      instagram: '',
      linkedin: '',
      facebook: ''
    },
    order: 0
  };

  const [formData, setFormData] = useState<AboutTeamMember>(emptyMember);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/about-team');
      if (!res.ok) throw new Error('Failed to fetch team members');
      const data = await res.json();
      setMembers(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load team members',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const method = editingMember ? 'PUT' : 'POST';
      const body = editingMember ? { ...formData, _id: editingMember._id } : formData;

      const res = await fetch('/api/about-team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to save team member');

      toast({
        title: 'Success',
        description: `Team member ${editingMember ? 'updated' : 'added'} successfully`
      });

      setDialogOpen(false);
      setFormData(emptyMember);
      setEditingMember(null);
      fetchMembers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save team member',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: AboutTeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/about-team?id=${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete team member');

      toast({
        title: 'Success',
        description: 'Team member deleted successfully'
      });

      fetchMembers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete team member',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData(emptyMember);
    setEditingMember(null);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>About Us - Team Management</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setFormData(emptyMember); setEditingMember(null); }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9234112345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Team Member Photo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="./assets/about/member.webp"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploading}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const formDataUpload = new FormData();
                        formDataUpload.append('file', file);
                        
                        try {
                          setUploading(true);
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            body: formDataUpload,
                          });
                          
                          if (!res.ok) {
                            const errorData = await res.json();
                            throw new Error(errorData.error || 'Upload failed');
                          }
                          
                          const data = await res.json();
                          setFormData({ ...formData, imageUrl: data.url });
                          
                          toast({
                            title: 'Success',
                            description: 'Image uploaded successfully'
                          });
                        } catch (error: any) {
                          toast({
                            title: 'Error',
                            description: error.message || 'Failed to upload image',
                            variant: 'destructive'
                          });
                        } finally {
                          setUploading(false);
                          // Reset input
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="h-24 w-24 rounded-lg object-cover border-2"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-avatar.png';
                        }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Upload an image (max 5MB) or enter a path manually
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Social Links (Optional)</Label>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                      })}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                      })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.socialLinks.facebook}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                      })}
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingMember ? 'Update' : 'Add'} Team Member
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loading && !members.length ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Social Links</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No team members added yet. Click "Add Team Member" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell>{member.order}</TableCell>
                      <TableCell>
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.designation}</TableCell>
                      <TableCell>{member.phone || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {member.socialLinks.instagram && <span title="Instagram">📷</span>}
                          {member.socialLinks.linkedin && <span title="LinkedIn">💼</span>}
                          {member.socialLinks.facebook && <span title="Facebook">📘</span>}
                          {!member.socialLinks.instagram &&
                            !member.socialLinks.linkedin &&
                            !member.socialLinks.facebook && '-'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(member)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => member._id && handleDelete(member._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
