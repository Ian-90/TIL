import MeetupDetail from "../../components/meetups/MeetupDetail";
import { connectDB } from "../../utils/database";
import { ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const { db, client } = await connectDB();
  const meetupsCollection = await db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    /*
    true - 페이지를 찾을 수 없는 경우 빈페이지 즉시 반환
    false - 사용자가 paths에 있는 주소로 접속하지 않으면 404 에러
    blocking - 페이지가 미리 생성될 때 까지 사용자에게 아무것도 보여주지 않다가 완성된 페이지를 제공
    */
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const { db, client } = await connectDB();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
