import { BiLogoTelegram } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

const NotFoundPage = () => {
  return (
    <div className="m-auto flex h-[90%] w-[90%] flex-col gap-7 py-10 font-mono text-lg">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Conent Not Found</h1>
        <p className="">
          The content you are looking for was not found. Please check the URL or
          try again later. For the mean time, we have generated a random typing
          test for you to try.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
