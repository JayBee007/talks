export default (seqeulize, DataTypes) => {

  const Message = seqeulize.define('message', {
    text: DataTypes.STRING,
  });

  Message.associate = models => {
    
    Message.belongsTo(models.User, {
      foreignKey: { name: 'userId', field: 'user_id'},
    });
  };

  return Message;
}