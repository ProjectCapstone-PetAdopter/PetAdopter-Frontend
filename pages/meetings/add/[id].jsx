import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../../components/Layout";
import TitlePage from "../../../components/TitlePage";
import { CustomInput } from "../../../components/CustomInput";
import { SmallButton } from "../../../components/CustomButton";

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie("tokenoauth", { req, res });
  const jwt = getCookie("token", { req, res });
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const { id } = params;
  return {
    props: {
      id,
      jwt,
      token,
    },
  };
}

export default function AddMeeting({ token, jwt, id }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      token,
      adoptionid: parseInt(id),
      time,
      date,
    };
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch("https://golangprojectku.site/meetings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        if (code === 200) {
          router.push("/meetings/myappointments");
        }
        alert(message);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout headTitle="Meeting Invitation" headDesc="Add Meeting Invitation">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Meeting Invitation" />
        <div className="py-4 md:py-6 font-Poppins">
          <div className="grid grid-cols-1 gap-5 justify-items-center">
            <div className="grid grid-cols-1 gap-5 md:w-96">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 justify-items-center gap-2">
                  <CustomInput
                    id="inputDate"
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CustomInput
                    id="inputTime"
                    type="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                  <button
                    className="text-md md:text-2xl py-1 md:py-2 w-24 md:w-32 rounded-lg font-Poppins bg-primary text-white"
                    disabled={loading}
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add
                  </button>
                  <SmallButton
                    href="/appliers"
                    label="cancel"
                    className="bg-accent"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
