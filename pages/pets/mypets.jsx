import { useState } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";

import { MdAddCircle } from "react-icons/md";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import PetCard from "../../components/PetCard";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    "https://golangprojectku.site/mypets",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    deleteCookie("token");
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
}

export default function MyPets({ data, token }) {
  const [pets, setPets] = useState(data);
  const [loading, setLoading] = useState(false);

  return (
    <Layout headTitle="My Pets" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="My Pets" />
        <div className="my-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {pets.map((pet) => (
            <PetCard
              key={pet.petid}
              id={pet.petid}
              name={pet.petname}
              image={pet.petphoto}
              gender={pet.gender}
              city={pet.city}
              age={pet.age}
            />
          ))}
        </div>
        <Link href="/pets/createPet">
          <div className="fixed right-4 bottom-20 md:bottom-4">
            <div className="md:hidden">
              <MdAddCircle size={55} color={"FFC700"} className="dark:hidden" />
            </div>
            <div className="md:hidden">
              <MdAddCircle
                size={55}
                color={"CDA000"}
                className="hidden dark:block"
              />
            </div>
            <div className="hidden md:block">
              <MdAddCircle size={75} color={"FFC700"} className="dark:hidden" />
            </div>
            <div className="hidden md:block">
              <MdAddCircle
                size={75}
                color={"FFC700"}
                className="hidden dark:block"
              />
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
