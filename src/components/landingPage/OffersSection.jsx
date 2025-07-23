export default function OffersSection({ offers }) {
  const offers3 = offers.slice(0, 3);
  const show = offers3.map((offer) => {
    return (
      <article class=" relative flex flex-col bg-grayc rounded-xl shadow-lg hover:shadow-2xl shadow-curawell/50 transition-all duration-300 hover:-translate-y-3 hover:cursor-pointer">
        <img
          src="src/assets/Selection (7).png"
          alt="Rebuild, Refresh your skin"
          class="aspect-video w-full rounded-t-xl object-cover"
        />
        <div class=" px-10 pb-10">
          <h3 class="mt-6 text-xl font-semibold">{offer.name_en}</h3>
          <p class="mt-2 flex-1 text-gray-600">
            {offer.description_en}
            <br></br>
            <p className="text-2xl text-curawell font-bold">
              {Math.ceil(offer.discount_rate)}%
            </p>
          </p>

          <a
            href="#"
            className="absolute bottom-3 inline-flex items-center gap-2 text-curawell font-medium hover:underline"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </article>
    );
  });
  return (
    <section class="mx-auto w-full px-10 sm:px-20 py-40 mb-10 sm:mb-100">
      <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3">{show}</div>
    </section>
  );
}
