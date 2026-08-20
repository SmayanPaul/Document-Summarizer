export default function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Minor Grid (60px x 60px) */}
            <div className="absolute inset-0 minor-grid" />

            {/* Major Grid (300px x 300px) */}
            <div className="absolute inset-0 major-grid" />
        </div>
    );
}