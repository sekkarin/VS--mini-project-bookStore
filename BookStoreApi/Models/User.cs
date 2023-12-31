using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookStoreApi.Models;

public class User
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("Name")]
  public string Name { get; set; } = null!;

  public string UserName { get; set; } = null!;

  public string? Password { get; set; }

}