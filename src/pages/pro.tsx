import { type NextPage } from 'next';

import { GlobalLayout } from '~/components/layout/GlobalLayout';
import { CheckIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';

import { useCallback, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const ProFeature = (props: { text: string; wip?: boolean }) => {
  return (
    <div className="flex flex-row items-center gap-x-3">
      <CheckIcon
        className={clsx(
          'block h-5 w-5',
          props.wip ? 'text-neutral-400' : 'text-green-400'
        )}
        strokeWidth={2.5}
      />
      <div className="flex flex-col">
        <span>{props.text}</span>
        {props.wip ? (
          <span className="text-sm text-neutral-400">
            {'(work in progress)'}
          </span>
        ) : null}
      </div>
    </div>
  );
};

const ProPage: NextPage = () => {
  const sess = useSession();
  const [purchaseBtnDisabled, setPurchaseBtnDisabled] = useState(false);

  const purchasePro = useCallback(() => {
    if (sess.status !== 'authenticated') {
      signIn();
      return;
    }

    setPurchaseBtnDisabled(true);
    window.open(
      `${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL}?checkout[email]=${sess.data.user.email}`
    );
    setPurchaseBtnDisabled(false);
  }, [sess]);

  return (
    <GlobalLayout title="Pro" displayTitle={false} isLandingPage>
      <div className="flex flex-col justify-center p-6 py-20">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Subscribe to{' '}
            <span className="bg-gradient-to-br from-indigo-500 to-green-500 bg-clip-text text-transparent">
              Pro
            </span>
          </h2>
          <h3 className="mb-10 text-xl font-medium text-neutral-700 dark:text-neutral-300">
            Get more features and support the developer!
          </h3>
          <button
            onClick={purchasePro}
            className="primaryish-button pls-subscribe"
            disabled={
              purchaseBtnDisabled || sess.data?.extraProfile.plan === 'pro'
            }
          >
            Subscribe for $1.99/mo
          </button>
        </div>

        <div className="mb-40 flex flex-col gap-3 self-center text-lg">
          <ProFeature text="Pro badge on lists" />
          <ProFeature text="Auto updating packs" />
          <ProFeature text="packwiz support" />
          <ProFeature text="Custom URLs" />
          <ProFeature text="Priority support" />
          <ProFeature text="File uploading" wip />
          <ProFeature text="Modrinth synchronization" wip />
          <ProFeature text="No ads" wip />
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ProPage;
