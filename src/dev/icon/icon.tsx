import { cn } from "@/lib/utils"

export const ComponentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4l8 4-8 4-8-4 8-4z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12l8 4 8-4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l8 4 8-4"
    />
  </svg>
)

export const PreviewIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

export const Icons = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-6 h-6", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="17" y="3" width="4" height="5" rx="1" fill="currentColor" />

    <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="17" y="10" width="4" height="5" rx="1" fill="currentColor" />

    <rect x="3" y="17" width="5" height="4" rx="1" fill="currentColor" />
    <rect x="10" y="17" width="5" height="4" rx="1" fill="currentColor" />
    <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor" />
  </svg>
)

export const CategoryIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-6 h-6", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM3 14h7v7H3v-7zM14 14h7v7h-7v-7z"
    />
  </svg>
)

export const MenuIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export const XIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export const SidebarOpenIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

export const SidebarCloseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

export const ArrowLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

export const ArrowRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

export const PersonIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A10.002 10.002 0 0112 15c2.42 0 4.63.86 6.313 2.28M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

export const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11" />
  </svg>
)

export const LoadIcon = () => (
  <svg
    className="w-6 h-6 animate-spin text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export const TrashIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m10 0H5"
    />
  </svg>
)

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-6 h-6", className)} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
    />
  </svg>
)

export const ErrorIcon = () => (
  <svg className="w-6 h-6 border-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856C19.59 19 20 18.55 20 18.056V5.944C20 5.45 19.59 5 19.056 5H4.944C4.41 5 4 5.45 4 5.944v12.112C4 18.55 4.41 19 4.944 19z" />
  </svg>
)

export const WarningIcon = () => (
  <svg className="w-6 h-6 border-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-7.938 4h15.856c.654 0 1.055-.645.816-1.25L13.816 4.25a1 1 0 00-1.632 0L4.122 17.75A1 1 0 004.938 19z" />
  </svg>
)

export const InfoIcon = () => (
  <svg className="w-6 h-6 border-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
  </svg>
)

export const ChevronUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
)

export const ChevronDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l-5-5 5-5" />
  </svg>
)

export const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l7-7-7-7" />
  </svg>
)

export const PasswordIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 11V7a4 4 0 018 0v4"
    />
  </svg>
);

export const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a8.38 8.38 0 0113 0" />
  </svg>
)

export const EyeOpenIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const EyeClosedIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.94 17.94A10.97 10.97 0 0112 20c-7 0-11-8-11-8a20.91 20.91 0 014.15-5.56M9.88 9.88a3 3 0 104.24 4.24"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22" />
  </svg>
)

export const DragDropIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
}) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.75 30C7.475 30 5.531 29.2125 3.918 27.6375C2.305 26.0625 1.499 24.1375 1.5 21.8625C1.5 19.9125 2.0875 18.175 3.2625 16.65C4.4375 15.125 5.975 14.15 7.875 13.725C8.5 11.425 9.75 9.5625 11.625 8.1375C13.5 6.7125 15.625 6 18 6C20.925 6 23.4065 7.019 25.4445 9.057C27.4825 11.095 28.501 13.576 28.5 16.5C30.225 16.7 31.6565 17.444 32.7945 18.732C33.9325 20.02 34.501 21.526 34.5 23.25C34.5 25.125 33.8435 26.719 32.5305 28.032C31.2175 29.345 29.624 30.001 27.75 30H19.5C18.675 30 17.9685 29.706 17.3805 29.118C16.7925 28.53 16.499 27.824 16.5 27V19.275L14.1 21.6L12 19.5L18 13.5L24 19.5L21.9 21.6L19.5 19.275V27H27.75C28.8 27 29.6875 26.6375 30.4125 25.9125C31.1375 25.1875 31.5 24.3 31.5 23.25C31.5 22.2 31.1375 21.3125 30.4125 20.5875C29.6875 19.8625 28.8 19.5 27.75 19.5H25.5V16.5C25.5 14.425 24.7685 12.656 23.3055 11.193C21.8425 9.73 20.074 8.999 18 9C15.925 9 14.156 9.7315 12.693 11.1945C11.23 12.6575 10.499 14.426 10.5 16.5H9.75C8.3 16.5 7.0625 17.0125 6.0375 18.0375C5.0125 19.0625 4.5 20.3 4.5 21.75C4.5 23.2 5.0125 24.4375 6.0375 25.4625C7.0625 26.4875 8.3 27 9.75 27H13.5V30H9.75Z"
      fill="#0077FF"
    />
  </svg>
);

export const SidebarIncreaseLine: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <path
      d="M26.6669 24C27.0067 24.0004 27.3336 24.1305 27.5807 24.3638C27.8278 24.5971 27.9766 24.9159 27.9965 25.2552C28.0164 25.5944 27.906 25.9285 27.6879 26.1891C27.4698 26.4497 27.1604 26.6172 26.8229 26.6573L26.6669 26.6667H5.33358C4.99374 26.6663 4.66687 26.5362 4.41975 26.3029C4.17264 26.0696 4.02393 25.7507 4.00401 25.4115C3.9841 25.0722 4.09448 24.7382 4.3126 24.4776C4.53072 24.217 4.84011 24.0495 5.17758 24.0093L5.33358 24H26.6669ZM26.6669 17.3333C27.0205 17.3333 27.3597 17.4738 27.6097 17.7239C27.8598 17.9739 28.0002 18.313 28.0002 18.6667C28.0002 19.0203 27.8598 19.3594 27.6097 19.6095C27.3597 19.8595 27.0205 20 26.6669 20H14.6669C14.3133 20 13.9741 19.8595 13.7241 19.6095C13.4741 19.3594 13.3336 19.0203 13.3336 18.6667C13.3336 18.313 13.4741 17.9739 13.7241 17.7239C13.9741 17.4738 14.3133 17.3333 14.6669 17.3333H26.6669ZM4.85758 12.2307L5.24424 12.432L5.70291 12.684C5.78558 12.7293 5.87091 12.7773 5.95758 12.828L6.51224 13.1533L6.81091 13.3347L7.44424 13.7373C7.78691 13.9587 8.10291 14.1733 8.39224 14.3773L8.93491 14.7653L9.17891 14.9467L9.60824 15.2747L9.95758 15.552C10.2429 15.784 10.2309 16.2467 9.93091 16.4893L9.58291 16.764L9.15758 17.088L8.65758 17.4533L8.38024 17.6493L7.77358 18.064L7.44291 18.2813C7.21891 18.428 7.00158 18.564 6.79358 18.692L6.20024 19.0493L5.66958 19.3533L5.20824 19.6067L4.82158 19.8067C4.48424 19.98 4.12158 19.7587 4.08691 19.364L4.03358 18.684L3.98558 17.8173L3.96158 17.1453L3.94824 16.404V15.592L3.96291 14.812L3.98958 14.1093L4.02291 13.4907L4.08024 12.736C4.11624 12.3133 4.51358 12.056 4.85758 12.2293V12.2307ZM26.6669 10.6667C27.0205 10.6667 27.3597 10.8071 27.6097 11.0572C27.8598 11.3072 28.0002 11.6464 28.0002 12C28.0002 12.3536 27.8598 12.6928 27.6097 12.9428C27.3597 13.1929 27.0205 13.3333 26.6669 13.3333H14.6669C14.3133 13.3333 13.9741 13.1929 13.7241 12.9428C13.4741 12.6928 13.3336 12.3536 13.3336 12C13.3336 11.6464 13.4741 11.3072 13.7241 11.0572C13.9741 10.8071 14.3133 10.6667 14.6669 10.6667H26.6669ZM26.6669 4C27.0205 4 27.3597 4.14048 27.6097 4.39052C27.8598 4.64057 28.0002 4.97971 28.0002 5.33333C28.0002 5.68696 27.8598 6.02609 27.6097 6.27614C27.3597 6.52619 27.0205 6.66667 26.6669 6.66667H5.33358C4.97995 6.66667 4.64081 6.52619 4.39077 6.27614C4.14072 6.02609 4.00024 5.68696 4.00024 5.33333C4.00024 4.97971 4.14072 4.64057 4.39077 4.39052C4.64081 4.14048 4.97995 4 5.33358 4H26.6669Z"
      fill="currentColor"
    />
  </svg>
);

export const SidebarDecreaseLine: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <g clipPath="url(#clip0_1489_8110)">
      <path
        d="M26.6667 24C27.0203 24 27.3594 24.1405 27.6095 24.3905C27.8595 24.6406 28 24.9797 28 25.3333C28 25.687 27.8595 26.0261 27.6095 26.2761C27.3594 26.5262 27.0203 26.6667 26.6667 26.6667H5.33333C4.97971 26.6667 4.64057 26.5262 4.39052 26.2761C4.14048 26.0261 4 25.687 4 25.3333C4 24.9797 4.14048 24.6406 4.39052 24.3905C4.64057 24.1405 4.97971 24 5.33333 24H26.6667ZM26.6667 17.3333C27.0065 17.3337 27.3334 17.4638 27.5805 17.6971C27.8276 17.9304 27.9763 18.2493 27.9962 18.5885C28.0161 18.9278 27.9058 19.2618 27.6876 19.5224C27.4695 19.783 27.1601 19.9505 26.8227 19.9907L26.6667 20H14.6667C14.3268 19.9996 14 19.8695 13.7528 19.6362C13.5057 19.4029 13.357 19.0841 13.3371 18.7448C13.3172 18.4056 13.4276 18.0715 13.6457 17.8109C13.8638 17.5503 14.1732 17.3828 14.5107 17.3427L14.6667 17.3333H26.6667ZM9.42 12.2307C9.76267 12.0547 10.1613 12.3133 10.1973 12.736L10.2533 13.4907L10.288 14.1093L10.3147 14.812L10.3227 15.1933L10.3307 16.0093L10.324 16.7827L10.3053 17.4893L10.2773 18.1253L10.2253 18.932L10.1907 19.364C10.1547 19.7587 9.792 19.9787 9.45467 19.8067L9.068 19.6067L8.608 19.3533L8.07733 19.0493L7.788 18.8773L7.16533 18.4933L6.504 18.064L5.896 17.6507L5.62 17.4533L5.12 17.088L4.51067 16.6213C4.45625 16.5776 4.40203 16.5336 4.348 16.4893C4.04667 16.2467 4.03333 15.784 4.32133 15.552L4.668 15.2747L5.09867 14.9467L5.604 14.576L6.18267 14.1693C6.388 14.0293 6.60533 13.884 6.832 13.736L7.156 13.5293L7.76533 13.1533L8.32 12.828L8.812 12.552L9.42 12.2307ZM26.6667 10.6667C27.0203 10.6667 27.3594 10.8071 27.6095 11.0572C27.8595 11.3072 28 11.6464 28 12C28 12.3536 27.8595 12.6928 27.6095 12.9428C27.3594 13.1929 27.0203 13.3333 26.6667 13.3333H14.6667C14.313 13.3333 13.9739 13.1929 13.7239 12.9428C13.4738 12.6928 13.3333 12.3536 13.3333 12C13.3333 11.6464 13.4738 11.3072 13.7239 11.0572C13.9739 10.8071 14.313 10.6667 14.6667 10.6667H26.6667ZM26.6667 4C27.0203 4 27.3594 4.14048 27.6095 4.39052C27.8595 4.64057 28 4.97971 28 5.33333C28 5.68696 27.8595 6.02609 27.6095 6.27614C27.3594 6.52619 27.0203 6.66667 26.6667 6.66667H5.33333C4.97971 6.66667 4.64057 6.52619 4.39052 6.27614C4.14048 6.02609 4 5.68696 4 5.33333C4 4.97971 4.14048 4.64057 4.39052 4.39052C4.64057 4.14048 4.97971 4 5.33333 4H26.6667Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1489_8110">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
