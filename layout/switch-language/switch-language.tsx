import React, { useContext, useState } from "react";
import Image from "next/image";
import i18nConfig from "../../i18n.json";
import { LanguageContext } from "@/contexts/LanguageContext";
import style from "./switch-language.module.css";
import { useRouter } from "next/router";

const SwitchLanguage: React.FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const { language, setLanguage } = useContext(LanguageContext)!;
  const { locales } = i18nConfig;
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (lang: string) => {
    const currentPathname = router.pathname;
    const currentQuery = router.query;
    const defaultLanguage = i18nConfig.defaultLocale;

    const isDefaultLanguage = lang === defaultLanguage;

    // If the current page is already in the default language,
    // remove the language prefix when switching to the default language
    // const newPathname = isDefaultLanguage
    //   ? currentPathname.replace(`/${language}`, '')
    //   : `/${lang}${currentPathname}`;

    const newPathname = lang
      ? `/${lang}${currentPathname}`
      : `/${currentPathname}`;

    router.push(
      {
        pathname: newPathname,
        query: currentQuery,
      },
      undefined,
      { locale: lang }
    );

    setLanguage(lang);
  };

  return (
    <div className={style.dropdown}>
      {language && (
        <Image
          src={`/main_assets/flag-${language}.svg`}
          alt={`flag-${language}`}
          onClick={handleDropdownToggle}
          width={35}
          height={25}
        />
      )}
      {isDropdownOpen && (
        <div
          className={`${style.dropdownMenu} ${
            isMobile ? style.dropdownMenuMob : ""
          }`}
          aria-labelledby="dropdown-basic-button"
        >
          {locales.map((lng) => {
            if (lng === language) return null;

            return (
              <Image
                key={lng}
                src={`/main_assets/flag-${lng}.svg`}
                alt={`flag-${lng}`}
                onClick={() => handleLanguageChange(lng)}
                width={35}
                height={25}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwitchLanguage;
