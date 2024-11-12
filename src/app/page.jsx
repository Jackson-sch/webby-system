import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import HeaderNav from "@/components/Sidebar/header";
import Navbar from "@/components/Sidebar/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <HeaderNav />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem aspernatur autem quas tenetur possimus amet dolore quos cum quae minus sequi, ullam voluptatem. Laboriosam qui unde quasi pariatur nam?
              Sunt laborum, sit tenetur esse qui totam. Cumque rem ad dolorum quia tempora incidunt fugit atque eum assumenda. Iusto, maiores consectetur quam soluta dicta nihil quae placeat pariatur expedita consequuntur.
              Assumenda voluptas sed esse optio repellendus, quam quaerat atque qui voluptatum beatae ea nihil omnis explicabo aut tenetur! Laudantium architecto, ab ex laborum totam qui dolorem sit sapiente hic accusamus.
              Blanditiis, tempora dolore dignissimos quibusdam sequi porro repellat corrupti recusandae commodi explicabo neque impedit reprehenderit, excepturi aliquid a omnis, quos autem. Numquam aspernatur molestias, est repudiandae iusto non! Maiores, vel.
              Possimus, quae voluptatum rerum sequi, quos dolorum quas iure necessitatibus non nulla esse harum dolor optio eos autem. Perferendis quod pariatur necessitatibus vero veniam minima nemo magni dolorum soluta nesciunt!
              Veniam ex, voluptatibus sequi officia possimus at, ipsa hic eveniet cupiditate eum dolore consequatur. Unde molestiae fugiat doloremque, sed eos veritatis? Nobis voluptas id aliquid reprehenderit atque, a iusto laudantium?
              Numquam maiores hic voluptas nesciunt optio officiis tempore commodi, non facilis? Pariatur similique porro impedit nulla obcaecati, totam accusamus qui excepturi quia laudantium deleniti, eveniet necessitatibus tempore cupiditate nemo at.
              Laboriosam earum qui, consequatur alias quas, labore ullam similique pariatur tenetur sequi ipsam perferendis perspiciatis corrupti obcaecati quod voluptatem illo quasi aut, veniam et. Excepturi laudantium iure explicabo vero ullam.
              Quo ipsam modi minima nesciunt facilis et, dolorem, perferendis consectetur neque minus ex, omnis animi. Cum eos, eveniet qui illum voluptas, necessitatibus dolorum provident maiores similique, dolores est ex doloremque?
              Blanditiis, sapiente. Labore vel temporibus quas dolore molestias laborum repellat a reprehenderit corporis expedita repudiandae qui esse rerum doloribus, rem voluptatibus asperiores enim dicta, corrupti cupiditate provident, ducimus ab. Placeat?
              Adipisci possimus laudantium quod, tempora quasi eius! Aliquid earum, amet et suscipit aliquam pariatur molestias delectus accusamus ipsam ut cumque natus optio sed consequatur quia facere illum quas accusantium impedit?
              Blanditiis consectetur earum harum debitis doloremque omnis aspernatur dignissimos nulla autem optio corrupti molestias a id est iure velit quis quasi soluta fuga, ullam accusantium laudantium dolore similique! Modi, rerum.
              Alias laboriosam fugiat minus vero. Expedita quam a reprehenderit pariatur accusantium ut mollitia? Soluta tenetur repellat ea ratione labore similique nulla, sed veniam fugit excepturi quae quo consequatur aperiam nemo.
              Placeat atque ex, rerum officia reprehenderit, nostrum temporibus labore est dolorem a earum perferendis, fugit beatae repudiandae. In, mollitia ab officiis voluptatem laborum commodi optio saepe nam, ipsam, quibusdam laudantium.
              Nobis at sapiente voluptatibus voluptatum et asperiores esse earum, eveniet iste libero doloribus excepturi, odit nisi molestias exercitationem, modi illum natus iusto autem culpa cum optio quia! Facere, eligendi impedit?
              Eaque odio ad cupiditate, neque ipsum, animi quo fuga veniam molestiae minus inventore dolores fugiat voluptas modi adipisci nisi vero dolore asperiores commodi debitis ea harum quisquam enim hic? Quos!
              Deserunt adipisci dolores quod exercitationem molestiae reprehenderit nam, enim tenetur qui at molestias similique facere porro, voluptas ad omnis facilis sit beatae mollitia? Cupiditate atque tenetur aspernatur nesciunt, labore repellat.
              Facilis tempora blanditiis sint accusamus vero inventore fugiat iusto maxime ratione quos eveniet quidem quia repudiandae dolor itaque, aperiam dolores dolorum. Exercitationem, cum ad. Distinctio saepe accusamus sit expedita eum!
              Tenetur, nam iusto porro, neque, fuga laudantium ab quas quasi deserunt aspernatur quae est soluta odit dicta recusandae maiores sed velit beatae! Autem tenetur dolorem recusandae, delectus numquam vero ratione!
              Deserunt quibusdam aspernatur saepe amet perspiciatis atque dolore in a quas illum maxime tempore quod, eveniet error placeat esse voluptas minus reprehenderit ut unde reiciendis sit quo odio id? Illo.
              Sapiente quidem quas neque quo tempore minus culpa a. Odio quidem possimus dolorem veritatis explicabo. Animi voluptas ex voluptatem saepe sapiente consequatur sed exercitationem. Ad impedit modi at distinctio delectus?</p>
              <h1>hello</h1>{" "}
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
