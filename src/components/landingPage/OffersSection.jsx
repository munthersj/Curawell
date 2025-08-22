export default function OffersSection({ offers }) {
  const offers3 = offers.slice(0, 3);
  const show = offers3.map((offer, i) => {
    return (
      <article
        key={i}
        className=" relative flex flex-col bg-grayc rounded-xl shadow-lg hover:shadow-2xl shadow-curawell/50 transition-all duration-300 hover:-translate-y-3 hover:cursor-pointer"
      >
        <img
          src="src/assets/Selection (7).png"
          alt="Rebuild, Refresh your skin"
          className="aspect-video w-full rounded-t-xl object-cover"
        />
        <div className=" px-10 pb-10">
          <h3 className="mt-6 text-xl font-semibold">{offer.name_en}</h3>
          <div className="mt-2 flex-1 text-gray-600">
            {offer.description_en}
            <br></br>
            <p className="text-2xl text-curawell font-bold">
              {offer.discount_rate}%
            </p>
          </div>

          <a
            href="#"
            className="absolute bottom-3 inline-flex items-center gap-2 text-curawell font-medium hover:underline"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </article>
    );
  });
  return (
    <section className="mx-auto w-full px-10 sm:px-20 py-40 mb-10 sm:mb-100">
      <div className="grid gap-20 sm:grid-cols-2 md:grid-cols-3">{show}</div>
    </section>
  );
}
