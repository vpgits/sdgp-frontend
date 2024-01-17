interface Props {
    user: any[] | null;
  }
  
  export default function Profile({ user }: Props) {
    return (
      <>
        <div>{JSON.stringify(user)}</div>
      </>
    );
  }