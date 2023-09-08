const getFinalPromptData = async (profileObj) => {
    const name = profileObj.name;
    const experience = profileObj.experience;
    const skills = profileObj.skills;
    const prom1 = `${name} has experience as (${experience}), with skill set of "${skills}". Write me one personlize chat message
to tell her about the job opportunity, As I have job opening for same in company growexx within 150 words. And writem me 3 different messages for same,
By separating them 'Message' key like Message 1, Message 2, Message 3`;
    const prom2 = `${name} has experience as (${experience}), with skill set of "${skills}". Write me one personlize chat message
to ask her if she is open for job? within 150 words. And writem me 3 different messages for same, By separating them 'Message' key like Message 1, Message 2, Message 3`
    const prom3 = `${name} has experience as (${experience}), with skill set of "${skills}". Write me one personlize chat message
to ask her, is she open for job, As I have job opening for same in company growexx. within 150 words. And writem me 3 different messages for same,
By separating them 'Message' key like Message 1, Message 2, Message 3`;
    return [prom1, prom2, prom3];
};

export { getFinalPromptData };
