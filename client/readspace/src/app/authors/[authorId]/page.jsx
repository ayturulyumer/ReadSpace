"use client";
import { useEffect, useState } from "react";
import { getSingleAuthor } from "@/app/actions/authorActions.js";
import { useRouter } from "next/navigation.js";
import BookCard from "@/app/components/BookCard/BookCard.jsx";
import Spinner from "@/app/components/Spinner/Spinner.jsx";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Author() {
  const [author, setAuthor] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthor = async () => {
      const { data: authorData, error: authorError } = await getSingleAuthor(5);

      if (authorError || !authorData) {
        router.push("/404");
      } else {
        setAuthor(authorData);
        setIsLoading(false);
      }
    };
    fetchAuthor();
  }, []);

  const getBookIdHandler = (bookId) => {
    router.push(`/catalog/details/book?bookId=${bookId}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-4 py-8  tracking-wide text-primary-content ">
          <header className="flex flex-col md:flex-row items-center mb-8">
            <div className="avatar mb-4 md:mb-0 md:mr-8">
              <div className="w-56 rounded-xl ring ring-accent ring-offset-base-100 ring-offset-2">
                <Image
                  src={author?.image}
                  alt={author?.name}
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4 font-serif underline underline-offset-8 decoration-2  decoration-orange-500">
                {author?.name}
              </h1>
              <div className="flex justify-center  md:justify-start space-x-4">
                {author?.socials?.twitter && (
                  <a
                    href={author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline glass"
                  >
                    <FaTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {author?.socials?.facebook && (
                  <a
                    href={author.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline glass"
                  >
                    <FaFacebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                )}
                {author?.socials?.instagram && (
                  <a
                    href={author.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline glass "
                  >
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 font-serif relative underline underline-offset-8 decoration-2 decoration- decoration-orange-500">
              Biography
            </h2>
            <p className="tracking-widest">{author?.bio}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 font-serif underline underline-offset-8 decoration-2 decoration- decoration-orange-500">
              Books by {author?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {author?.books && author.books.length > 0 ? (
                author.books.map((book) => (
                  <BookCard
                    key={book.book_id}
                    book={book}
                    body={false}
                    getBookIdHandler={getBookIdHandler}
                  />
                ))
              ) : (
                <p className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-6">
                  Currently, we don't offer books from this author in our store.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
