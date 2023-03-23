const useDate = () => {
  const toDateString = (source, delimiter) => {
    const memento = source.split(delimiter);
    const year = memento[0];
    const month = ('00' + memento[1]).slice(-2);
    const day = ('00' + memento[2]).slice(-2);
    console.log(`here: ${year}-${month}-${day}`);
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };
  return { toDateString };
};
export default useDate;
