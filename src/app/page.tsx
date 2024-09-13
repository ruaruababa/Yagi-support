'use client';

import '@/lib/env';
import { Tag } from 'antd';
import Head from 'next/head';
import { Suspense, useMemo } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import useSupportYagi from './hooks/useSupportYagi';
import { tags } from './services/types';

import Skeleton from '@/components/Skeleton';
import dynamic from 'next/dynamic';
import LoadingPage from './loading';

// Sử dụng dynamic import cho các component mà bạn muốn tải động
const ListNeedSupport = dynamic(
  () => import('@/app/components/list-need-support'),
  {
    suspense: true,
    loading: () => <Skeleton />,
  },
);

const ListCanSupport = dynamic(() => import('./components/list-can-support'), {
  suspense: true,
  loading: () => <Skeleton />,
});

const ListSupportStay = dynamic(
  () => import('./components/list-support-stay'),
  {
    suspense: true,
  },
);

const ConnectGovPage = dynamic(() => import('./components/connect-gov'), {
  suspense: true,
});

const AddConnectGovForm = dynamic(
  () => import('./components/add-connect-gov-from'),
  {
    suspense: true,
  },
);

const CanSupportForm = dynamic(
  () => import('./components/add-can-support-form'),
  {
    suspense: true,
  },
);

const NeedSupportForm = dynamic(
  () => import('./components/add-need-support-form'),
  {
    suspense: true,
  },
);

const SupportStayForm = dynamic(
  () => import('./components/add-support-stay-form'),
  {
    suspense: true,
  },
);

const Filter = dynamic(() => import('./components/filter'), {
  suspense: true,
});

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const {
    districts,
    provinces,
    wards,
    form,
    activeTab,
    onSubmit,
    handleTabSwitch,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
    handleUpdateNeedStatus,
    needs,
    cans,
    govs,
    stays,
  } = useSupportYagi();

  const renderTabContent = useMemo(() => {
    switch (activeTab.key) {
      case 'list-need-support':
        return (
          <Suspense fallback={<LoadingPage />}>
            <ListNeedSupport
              data={needs}
              handleUpdateNeedStatus={handleUpdateNeedStatus}
            />{' '}
          </Suspense>
        );
      case 'add-support-info':
        return <NeedSupportForm form={form} onSubmit={onSubmit} />;
      case 'list-support-teams':
        return <ListCanSupport data={cans} />;
      case 'add-support-teams-info':
        return <CanSupportForm form={form} onSubmit={onSubmit} />;
      case 'list-accommodations':
        return <ListSupportStay data={stays} />;
      case 'add-accommodations-info':
        return <SupportStayForm form={form} onSubmit={onSubmit} />;
      case 'connect-authorities':
        return <ConnectGovPage data={govs} />;
      case 'add-connect-authorities':
        return <AddConnectGovForm form={form} onSubmit={onSubmit} />;
      default:
        return;
    }
  }, [activeTab, needs, cans, govs, stays, form, onSubmit]);

  return (
    <main>
      <Head>
        <title>Hỗ trợ thiên tai</title>
      </Head>
      <section className="min-h-[1000px] bg-white">
        <div className="layout py-10">
          <h1 className="min-md:text-2xl text-center text-xl font-semibold">
            Thông tin hỗ trợ vùng ngập lụt
          </h1>
          <div className="grid-4 mt-4 grid gap-y-2 max-md:grid-cols-2">
            {tags.map((tag) => (
              <Tag
                key={tag.key}
                className={`cursor-pointer p-2 `}
                color={activeTab.key === tag.key ? 'blue-inverse' : 'blue'}
                onClick={() => handleTabSwitch(tag)}
              >
                {tag.label}
              </Tag>
            ))}
          </div>

          <div className="mt-4">
            {!activeTab.hiddenFilter ? (
              <Suspense fallback={<LoadingPage />}>
                <Filter
                  provinces={provinces}
                  districts={districts}
                  wards={wards}
                  onChangeProvince={handleProvinceChange}
                  onChangeDistrict={handleDistrictChange}
                  onChangeWard={handleWardChange}
                />
              </Suspense>
            ) : null}
          </div>

          <div className="mt-4">{renderTabContent}</div>
        </div>
      </section>
      <footer className=" text-center text-gray-700">
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href="https://www.facebook.com/yang11052001/">
          Yang
        </UnderlineLink>
      </footer>
    </main>
  );
}
