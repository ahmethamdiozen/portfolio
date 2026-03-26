export default async function TenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">
          {tenant}
        </h1>
        <p className="text-[#9B9589]">This app is coming soon.</p>
      </div>
    </div>
  );
}
