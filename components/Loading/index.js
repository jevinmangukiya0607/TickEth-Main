export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-5">
      <div
        className="spinner-border text-orange animate-spin inline-block w-8 h-8 border-4 border-t-orange rounded-full"
        role="status"
      />
    </div>
  );
}
