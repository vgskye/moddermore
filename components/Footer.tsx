export default function Footer() {
  return (
    <div className="moddermore-footer">
      <a
        href="https://github.com/ryanccn/moddermore"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code open source under AGPLv3 license
      </a>
      {typeof process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA !== 'undefined' && (
        <a
          href={`https://github.com/ryanccn/moddermore/commit/${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Revision {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
        </a>
      )}
    </div>
  );
}
