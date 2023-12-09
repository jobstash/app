const MagicLoginCallbackPage = () => {
  const tokenParam = new URLSearchParams(window.location.search).get('token');

  return <pre>{JSON.stringify({ tokenParam })}</pre>;
};

export default MagicLoginCallbackPage;
