import { NavLink } from "react-router";

interface ShowsNavbarProps {
  title: string;
  subTitle: string;
  showDetailsNavbar: {
    path: string;
    title: string;
    route: string;
    subTitle: string;
  }[];
  setSubTitle: React.Dispatch<React.SetStateAction<string>>;
}

function ShowsNavbar({
  title,
  subTitle,
  showDetailsNavbar,
  setSubTitle,
}: ShowsNavbarProps) {
  return (
    <>
      {/* Show Title */}
      <h1 className="mb-2 text-gray-900 text-4xl">
        {title} {subTitle}
      </h1>
      {/* Show Nav Menu */}
      <div className="flex gap-2 mb-4">
        {showDetailsNavbar.map((navMenu, index) => (
          <NavLink key={index} to={navMenu.route}>
            <button
              className="bg-gray-200 shadow-sm px-4 py-1 rounded text-gray-500 hover:text-gray-900 cursor-pointer"
              onClick={() => {
                setSubTitle(navMenu.subTitle);
              }}
            >
              {navMenu.title}
            </button>
          </NavLink>
        ))}
      </div>
      <hr className="opacity-40 my-2 border-[#0b1016] border-b-1" />
    </>
  );
}

export default ShowsNavbar;
