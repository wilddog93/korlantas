export default function usePagination() {
  const MINIMAL_PAGE_ITEM_COUNT = 5;
  
  const paginate = (pagecount:number, currentPage:number, pageNumber:number) => {
    if (pageNumber < MINIMAL_PAGE_ITEM_COUNT) {
      throw new Error(`Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`);
    }
    if (pageNumber % 2 === 0) {
      throw new Error(`Must allow odd number of page items`);
    }
    if (pagecount < pageNumber) {
      return [...new Array(pagecount).keys()];
    }
    const left = Math.max(0, Math.min(pagecount - pageNumber, currentPage - Math.floor(pageNumber / 2)));

    const items: number[] = new Array(pageNumber);

    for (let i = 0; i < pageNumber; i += 1) {
      items[i] = i + left;
    }

    // replace non-ending items with placeholders
    if (items[0] > 0) {
      items[0] = 0;
      items[1] = -1;
    }
    if (items[items.length - 1] < pagecount - 1) {
      items[items.length - 1] = pagecount - 1;
      items[items.length - 2] = -2;
    }

    return items;
  }

  return { paginate }
}