const sendJsonErrorResponse = ({
  error,
  status,
}: {
  error: string | Error | unknown;
  status: number;
}) => {
  return new Response(
    JSON.stringify({
      error: String(error),
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status,
    }
  );
};

export default sendJsonErrorResponse;
