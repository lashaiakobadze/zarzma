import CurrentAlbum from "@/components/albums/album/Album";
import Loader from "@/components/shared/loader/Loader";
import MobileContext from "@/contexts/MobileContext";
import getAlbums from "@/pages/api/albumsApi";
import { Album } from "@/models/album.interface";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

const albumPage: NextPage = () => {
  const router = useRouter();
  const { albumId } = router.query;
  const { isMobile } = useContext(MobileContext);

  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    const fetchData = async () => {
      const data: { albums: Album[] } = await getAlbums();
      const foundAlbum = data?.albums.find(
        (album: Album) => album.id === +albumId!
      );
      setAlbum(foundAlbum);
    };

    if (!album && albumId) {
      fetchData();
    }
  }, [albumId, album]);

  return (
    <>
      {album ? <CurrentAlbum isMobile={isMobile} album={album} /> : <Loader />}
    </>
  );
};

export default albumPage;
