import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import EventDetails from "@/components/events/Details";

interface Props {
    id : string;
}

const EventDetailPage:NextPage<Props> = ({id}) => {
    return (
        <EventDetails id={id}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params?.id;
    return { props: { id } };
  };
export default EventDetailPage;