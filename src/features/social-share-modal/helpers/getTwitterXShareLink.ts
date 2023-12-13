export const getTwitterXShareLink = () => {
  const link = new URL("/intent/tweet", "https://twitter.com");

  link.searchParams.append(
    "text",
    "Check out my $GOOD trade on the @goodentrylabs"
  );

  return link.toString();
};
