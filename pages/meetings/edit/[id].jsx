import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import TitlePage from "../../../components/TitlePage";
import { CustomInput } from "../../../components/CustomInput";
import { SmallButton } from "../../../components/CustomButton";

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

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
    `https://golangprojectku.site/meetings/${id}`,

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

export default function EditMeeting({ data, token }) {
  const [date, setDate] = useState(data.date);
  const [time, setTime] = useState(data.time);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      date,
      time,
    };

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(
      `https://golangprojectku.site/meetings/${data.meetingid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        if (code === 200) {
          router.push("/meetings/myappointments");
        }
        alert(message);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <Layout headTitle="Meeting Invitation" headDesc="Edit Meeting Invitation">
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
                    className="text-md md:text-2xl py-1 md:py-2 w-24 md:w-32 rounded-lg font-Poppins bg-primary text-black hover:text-white"
                    disabled={loading}
                    type="submit"
                  >
                    Update
                  </button>
                  <SmallButton
                    href="/meetings/myappointments"
                    label="cancel"
                    className="text-black hover:text-white bg-accent"
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
