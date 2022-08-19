//This script will do tests
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const queue = kue.createQueue();

const list = [
  { name: 'Samra',
    phoneNumber: '+123244656765',
    address: 'Addis Abeba' 
  },
  { name: 'Solomon',
    phoneNumber: '+233545665765',
    address: 'Mekelle' 
  }
];

describe('createPushNotificationsJobs', () => {
  before(function() {
    queue.testMode.enter();
  });

  afterEach(function() {
    queue.testMode.clear();
  });

  after(function() {
    queue.testMode.exit()
  });

  it('checks the number of jobs', () => {
    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
  });

  it('check Job type', () => {
    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
  });
  it('check first job', () => {
    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs[0].data).to.eql({ name: 'Samra', phoneNumber: '+123244656765', address: 'Addis Abeba' });
  });
});
