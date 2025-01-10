import Document from "@/components/shared/Document/Document";

export default function Loading() {
  return (
    <Document locale={"en"}>
      <div
        className="flex gap-8 justify-center items-center my-10"
        style={{ minHeight: "calc(100vh - 20rem)" }}
      >
        <div className="animate-bounce bg-gray-200 rounded-md h-12 w-12 duration-1000" />
        <div className="animate-bounce bg-gray-200 rounded-sm h-8 w-8 duration-500" />
        <div className="animate-bounce bg-gray-200 rounded-md h-12 w-12 duration-1000" />
        <div className="animate-bounce bg-gray-200 rounded-sm h-8 w-8 duration-500" />
        <div className="animate-bounce bg-gray-200 rounded-md h-12 w-12 duration-1000" />
      </div>
    </Document>
  );
}
