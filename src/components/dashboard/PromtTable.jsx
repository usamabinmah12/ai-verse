'use client';

import React from 'react';
import { Table, Button, Badge } from '@heroui/react';
// Assuming gravity-ui/icons are installed and imported like this
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updateStatus } from '@/lib/actions/update';
// import { updateCompany } from '@/lib/actions/promts';

const PromtTable = ({ promts }) => {

    const handleApprove = async (id) => {
        // const result = await updateCompany(id, { status: 'Approved' })
        const result = await updateStatus(id , {status: 'Approved'})
        if (result.modifiedCount) {
            console.log(`Approved company with ID: ${id}`, result);
        }
    };

    const handleReject = async (id) => {
        const result = await updateStatus(id , {status: 'Rejected'})
        // const result = await updateCompany(id, { status: 'Rejected' })
    };

    // Helper to format date cleanly like "Oct 12, 2023"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Status mapping for visual styling
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { color: 'text-emerald-500', label: 'Approved' };
            case 'rejected':
                return { color: 'text-rose-500', label: 'Rejected' };
            case 'pending':
            default:
                return { color: 'text-amber-500', label: 'Pending' };
        }
    };

    // Helper to generate initials for the placeholder icon
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'CO';
    };

    return (
        <div className="w-full bg-[#121214] text-neutral-200 p-6 rounded-lg">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company approval management table">
                        <Table.Header>
                            {/* Add the isRowHeader prop to your primary identifying column */}
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Company Name
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Recruiter Email
                            </Table.Column>

                           

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Date Submitted
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {promts.map((promt) => {
                                const promtId = promt._id?.$oid || promt._id;
                                const statusInfo = getStatusDetails(promt.status);

                                return (
                                    <Table.Row key={promtId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                                        {/* promt Avatar & Name */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-sm tracking-wider">
                                                   {promt.aiTool}
                                                </div>
                                                <span className="font-medium text-neutral-200">{promt.name}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Recruiter Email Placeholder */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            email
                                        </Table.Cell>

                                        {/* Industry Pill */}
                                        

                                        {/* Status Dot */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Date Submitted */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            {formatDate(promt.createdAt?.$date || promt.createdAt)}
                                        </Table.Cell>

                                        {/* Actions Panel */}
                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {promt.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(promtId)}
                                                        className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {promt.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(promtId)}
                                                        className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default PromtTable;