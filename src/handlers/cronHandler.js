const cron = require('cron');

let job;

function startCron() {
    if (job) {
        if (!job.running) {
            job.start();
        } else; //already running
    } else; //no job
}

function stopCron() {
    if (job) {
        if (job.running) {
            job.stop();
        } else; //not running
    } else; //no job
}

function isRunning() {
    if (job) return (job.running);
    return false;
}

function setCron(schedule, task) {
    if (job) {
        const wasRunning = job.running;
        if (wasRunning) stopCron();

        job = new cron.CronJob(schedule, task);

        startCron();
    } else {
        job = new cron.CronJob(schedule, task);
        startCron();
    }
}

module.exports = { setCron, isRunning, stopCron };