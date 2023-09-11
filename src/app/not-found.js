export default function Custom404() {
   return (
      <div className="w-full h-[100vh] bg-white flex flex-col items-center pt-10">
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src="/404.jpg" alt="img" width={400} height={400} />
         <h1 className="text-2xl font-bold text-black">Halaman Masih Kosong Ya 🤭</h1>
      </div>
   );
}
