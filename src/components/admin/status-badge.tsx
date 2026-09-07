interface StatusBadgeProps {
  status: string;
  variant?: "badge" | "dot";
}

export default function StatusBadge({ status, variant = "badge" }: StatusBadgeProps) {
  const getColors = (s: string) => {
    switch (s.toLowerCase()) {
      case "published":
      case "active":
      case "approved":
      case "responded":
        return "bg-green-100 text-green-800 border-green-200";
      case "new":
      case "unread":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "read":
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
      case "inactive":
      case "rejected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${getColors(
        status
      )}`}
    >
      {status}
    </span>
  );
}
