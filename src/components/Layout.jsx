import { Nav } from "./Nav";

export function Layout({children}){
  return (
    <div>
     <Nav />
      <main>
        {children}
      </main>
    </div>
  )
}