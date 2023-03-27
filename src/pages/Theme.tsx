import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { useDarkMode, useLocalStorage } from "usehooks-ts";

const id = "theme";
const Theme = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode(false);
  const [myTheme, setMyTheme] = useLocalStorage<string | null>("myTheme", null);

  const switchDefaultTheme = useCallback(() => {
    setMyTheme(null);
  }, []);
  const switchSwissTheme = useCallback(() => {
    setMyTheme("theme-1");
  }, []);
  const switchNeonTheme = useCallback(() => {
    setMyTheme("theme-2");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (myTheme) {
      document.getElementById("theme")?.setAttribute("class", myTheme);
    } else {
      document.getElementById("theme")?.removeAttribute("class");
    }
  }, [myTheme]);

  return (
    <div className={clsx("bg-white dark:bg-black", myTheme)}>
      Theme
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="text-black dark:text-white" onClick={toggle}>
        {isDarkMode ? "dark" : "light"}
      </button>
      <button className="text-black dark:text-white" onClick={enable}>
        enable
      </button>
      <button className="text-black dark:text-white" onClick={disable}>
        disable
      </button>
      <br />
      <button
        className="text-black dark:text-white"
        onClick={switchDefaultTheme}
      >
        Default
      </button>
      <button className="text-black dark:text-white" onClick={switchSwissTheme}>
        Theme-1
      </button>
      <button className="text-black dark:text-white" onClick={switchNeonTheme}>
        Theme-2
      </button>
      <div>
        <button className="bg-skin-fill p-2 rounded">
          <span className="text-skin-base dark:text-white">Button</span>
        </button>
      </div>
      <br />
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>Paragraph</p>
      <code>Code</code>
      <p className="lead">Lead</p>
      <p className="large">Large</p>
      <small>Small</small>
      <p className="subtitle">Subtitle</p>
    </div>
  );
};

export default Theme;
