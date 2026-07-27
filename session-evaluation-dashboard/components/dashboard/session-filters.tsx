type SessionFiltersProps = {
  studentFilter: string;
  startDate: string;
  endDate: string;
  availableStudents: string[];
  filteredCount: number;
  onStudentChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onClear: () => void;
};

export function SessionFilters({
  studentFilter,
  startDate,
  endDate,
  availableStudents,
  filteredCount,
  onStudentChange,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: SessionFiltersProps) {
  return (
    <div className="panel p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1 text-sm">
          <span>Student</span>
          <input
            list="students"
            value={studentFilter}
            onChange={(event) => onStudentChange(event.target.value)}
            placeholder="Filter by name"
            className="input"
          />
          <datalist id="students">
            {availableStudents.map((student) => (
              <option key={student} value={student} />
            ))}
          </datalist>
        </label>

        <label className="space-y-1 text-sm">
          <span>Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value)}
            className="input"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span>End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value)}
            className="input"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="muted">{filteredCount} shown</p>
        <button type="button" onClick={onClear} className="btn-ghost">
          Clear
        </button>
      </div>
    </div>
  );
}
