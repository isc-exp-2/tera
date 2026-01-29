"use client";

import { useMeRequestTable } from "../hooks/use-new-request-form";
import { MeRequestsBadge } from "./me-requests-badge";
import { MeRequestsTable } from "./me-requests-table";
import { NewRequestButton } from "./new-request-button";

export function MeRequestsFormat() {
  const { status, setStatus, data, isLoading, deleteRequest, isDeleting } =
    useMeRequestTable();
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <MeRequestsBadge value={status} onChange={setStatus} />

          <NewRequestButton />
        </div>
        <MeRequestsTable
          data={data}
          loading={isLoading}
          onDelete={deleteRequest}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
