module.exports = {
  createBucket = function(bucketName){
    // Instantiates a client
    const storage = Storage();

    // Creates a new bucket, e.g. "my-new-bucket"
    return storage.createBucket(bucketName)
      .then((results) => {
        const bucket = results[0];

        console.log(`Bucket ${bucket.name} created.`);

        return bucket;
      });
  },

  listBuckets = function(){
    // Instantiates a client
    const storage = Storage();

    // Lists all buckets in the current project
    return storage.getBuckets()
      .then((results) => {
        const buckets = results[0];

        console.log('Buckets:');
        buckets.forEach((bucket) => console.log(bucket.name));

        return buckets;
      });
  },
 
  deleteBucket = function(bucketName){
    // Instantiates a client
    const storage = Storage();

    // References an existing bucket, e.g. "my-bucket"
    const bucket = storage.bucket(bucketName);

    // Deletes the bucket
    return bucket.delete()
      .then(() => {
        console.log(`Bucket ${bucket.name} deleted.`);
      });
  }
}
