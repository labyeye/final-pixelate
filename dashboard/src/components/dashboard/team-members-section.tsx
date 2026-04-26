"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TeamMembersSectionProps {
  teamMembers: any[];
  projects: any[];
}

export function TeamMembersSection({
  teamMembers,
  projects,
}: TeamMembersSectionProps) {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">OUR TEAM</h2>
          <p className="text-muted-foreground text-lg">
            Meet our talented developers and editors
          </p>
        </div>
        <Link href="/developers-and-editors">
          <Button variant="outline" size="lg">
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.slice(0, 4).map((member) => {
          const memberEarnings = projects.reduce((sum, project) => {
            const assignees = project.assignees || [];
            const memberAssignment = assignees.find((a: any) => {
              const aid =
                a &&
                (a.id ??
                  a._id ??
                  a.teamMemberId ??
                  a.memberId ??
                  a.userId ??
                  a);
              return String(aid) === String(member._id ?? member.id);
            });
            return sum + Number(memberAssignment?.payout || 0);
          }, 0);

          
          const completedTasks = projects.filter((project) => {
            const assignees = project.assignees || [];
            const isAssigned = assignees.some((a: any) => {
              const aid =
                a &&
                (a.id ??
                  a._id ??
                  a.teamMemberId ??
                  a.memberId ??
                  a.userId ??
                  a);
              return String(aid) === String(member._id ?? member.id);
            });
            return isAssigned && project.status === "COMPLETED";
          }).length;

          
          const profileImage =
            member.profileImage ||
            member.image ||
            member.avatar ||
            member.avatarUrl;

          return (
            <Card
              key={member._id ?? member.id}
              className="border-2 border-black overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  {}
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>

                  {}
                  <div>
                    <h3 className="text-lg font-black tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {member.jobRole || "Team Member"}
                    </p>
                  </div>

                  {}
                  <div className="w-full space-y-1 text-xs">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <span className="font-mono">{member.phone || "N/A"}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {member.department || member.jobRole || "General"}
                    </div>
                    <div className="font-bold">
                      ₹ {member.ratePerTask?.toLocaleString() || "1,000"} / task
                    </div>
                  </div>

                  {}
                  <div className="text-muted-foreground text-xs">
                    Earned:{" "}
                    <span className="font-bold text-foreground">
                      ₹{memberEarnings.toLocaleString()}
                    </span>
                  </div>

                  {}
                  <div className="w-full">
                    <div className="bg-primary text-primary-foreground rounded-lg py-3 px-2">
                      <div className="text-3xl font-black">
                        {completedTasks}
                      </div>
                      <div className="text-xs font-medium mt-1">
                        tasks completed
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
