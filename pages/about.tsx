import React, { useContext, useEffect, useState } from "react";
import About from "@/components/about/About";
import { Article } from "../models/article.interface";
import getArticles from "./api/articlesApi";
import { DocType } from "../models/docType.enum";
import useTranslation from "next-translate/useTranslation";
import { NextPage } from "next";
import MobileContext from "@/contexts/MobileContext";

const AboutPage: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useTranslation("common");
  const { isMobile } = useContext(MobileContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getArticles(DocType.eparchy, lang);
      if (isMounted) {
        setArticles(data);
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [lang]);
  return <About isMobile={isMobile} articles={articles} loading={loading} />;
};

export default AboutPage;
