import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./graph"), { ssr: false });

export default function Page() {
   return (
      <div>
         <NoSSR />
      </div>
   );
}
