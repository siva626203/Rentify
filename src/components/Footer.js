import React from 'react'

function Footer() {
  return (
    <div className="">
      <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="bottom-0 w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Sivakumar - MERN Stack Developer
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="https://github.com/siva626203"
                class="hover:underline me-4 md:me-6"
              >
                Githup
              </a>
            </li>
            <li>
              <a
                href="https://sivakumar-developer.vercel.app/"
                class="hover:underline me-4 md:me-6"
              >
                Portfolio
              </a>
            </li>

            <li>
              <a href="https://wa.link/urc1mn" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer