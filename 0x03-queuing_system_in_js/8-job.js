// This script will craete queues

function createPushNotificationsJobs (jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  } else {
    for (const i of jobs) {
      const job = queue.create('push_notification_code_3', i)
        .save(function (err) {
          if (!err) {
            console.log('Notification job created:', job.id);
          }
        });
      job.on('complete', function (result) {
        console.log(`Notification job ${job.id} completed`);
      }).on('failed', function (errorMessage) {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      }).on('progress', function (progress, data) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    }
  }
}

export default createPushNotificationsJobs;
