'use client';

import * as React from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  MoreVertical,
  CheckCircle2,
  X,
  Trash2,
  UserCheck
} from 'lucide-react';
import { mockTeamMembers } from '@/lib/mock-data';
import { TeamMember, Role } from '@/lib/types';

export default function TeamPage() {
  const [members, setMembers] = React.useState<TeamMember[]>(mockTeamMembers);
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<Role>('Agent');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      role: inviteRole,
      status: 'Invited',
      lastActive: 'Never'
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setIsInviteModalOpen(false);
    showToast(`Invitation sent to ${inviteEmail}!`);
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    setMembers(prev =>
      prev.map(m => m.id === id ? { ...m, role: newRole } : m)
    );
    showToast('Updated member role');
  };

  const handleRevokeAccess = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    showToast('Revoked member access');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Access Control
            </span>
            <span className="text-xs text-slate-400">{members.length} Seats Assigned</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Team Members & Roles</h1>
          <p className="text-sm text-slate-400">Manage user access permissions, invite agents, and assign roles.</p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Members Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Member Name</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3 font-semibold text-slate-200">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                        {member.name[0]}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">
                    {member.email}
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={member.role}
                      onChange={e => handleRoleChange(member.id, e.target.value as Role)}
                      disabled={member.role === 'Owner'}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-indigo-300 focus:outline-none disabled:opacity-50"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Agent">Agent</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        member.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                    {member.lastActive}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {member.role !== 'Owner' && (
                      <button
                        onClick={() => handleRevokeAccess(member.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="Revoke Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleInviteUser} className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Invite Team Member</h3>
              <button type="button" onClick={() => setIsInviteModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Role Permission</label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as Role)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Admin font-medium">Admin (Full Workspace Controls)</option>
                  <option value="Editor">Editor (Configure Prompts & Knowledge)</option>
                  <option value="Agent">Agent (Live Chat Handoff & Reply)</option>
                  <option value="Viewer">Viewer (Read-Only Analytics)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
