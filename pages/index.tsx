import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TFunction, useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

type Props = {
  locale: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const config = (t: TFunction) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("chart-title", { ns: "chart" }),
      },
    },
  };
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = (t: TFunction) => {
  return {
    labels,
    datasets: [
      {
        label: t("dataset-spendings", { ns: "chart" }),
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: t("dataset-savings", { ns: "chart" }),
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation(["common", "chart"]);
  const router = useRouter();
  console.log({ t });

  return (
    <>
      <Link href='/' locale={router.locale === "en" ? "es" : "en"}>
        <button>{t("change-locale")}</button>
      </Link>
      <p>{t("title")}</p>
      <span>{t("content")}</span>
      <Line data={data(t)} options={config(t)} />
    </>
  );
};

export async function getStaticProps({ locale }: Props) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "chart"])),
      // Will be passed to the page component as props
    },
  };
}

export default Home;
