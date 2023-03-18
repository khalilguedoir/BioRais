module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("test", ".tmp/data.db"),
    },
    useNullAsDefault: true,
    debug: false,
  },
});
