'use client';

import '@/lib/env';
import { Tag } from 'antd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useMemo } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
import Skeleton from '@/components/Skeleton';

import useSupportYagi from './hooks/useSupportYagi';
import { tags } from './services/types';

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
    paginationCan,
    paginationGov,
    paginationNeed,
    paginationStay,
  } = useSupportYagi();

  const renderTabContent = useMemo(() => {
    switch (activeTab.key) {
      case 'list-need-support':
        return (
          <ListNeedSupport
            key={activeTab.key}
            data={needs}
            handleUpdateNeedStatus={handleUpdateNeedStatus}
            pagination={paginationNeed}
          />
        );
      case 'add-support-info':
        return (
          <NeedSupportForm
            districts={districts}
            provinces={provinces}
            wards={wards}
            key={activeTab.key}
            form={form}
            onSubmit={onSubmit}
          />
        );
      case 'list-support-teams':
        return (
          <ListCanSupport
            data={cans}
            pagination={paginationCan}
            key={activeTab.key}
          />
        );
      case 'add-support-teams-info':
        return (
          <CanSupportForm
            key={activeTab.key}
            form={form}
            onSubmit={onSubmit}
            districts={districts}
            provinces={provinces}
            wards={wards}
          />
        );
      case 'list-accommodations':
        return (
          <ListSupportStay
            key={activeTab.key}
            data={stays}
            pagination={paginationStay}
          />
        );
      case 'add-accommodations-info':
        return (
          <SupportStayForm
            key={activeTab.key}
            form={form}
            onSubmit={onSubmit}
            districts={districts}
            provinces={provinces}
            wards={wards}
          />
        );
      case 'connect-authorities':
        return (
          <ConnectGovPage
            key={activeTab.key}
            data={govs}
            pagination={paginationGov}
          />
        );
      case 'add-connect-authorities':
        return (
          <AddConnectGovForm
            key={activeTab.key}
            form={form}
            onSubmit={onSubmit}
            districts={districts}
            provinces={provinces}
            wards={wards}
          />
        );
      default:
        return;
    }
  }, [
    activeTab.key,
    needs,
    handleUpdateNeedStatus,
    paginationNeed,
    form,
    onSubmit,
    cans,
    paginationCan,
    stays,
    paginationStay,
    govs,
    paginationGov,
    districts,
    provinces,
    wards,
  ]);

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
              <Filter
                provinces={provinces}
                districts={districts}
                wards={wards}
                onChangeProvince={handleProvinceChange}
                onChangeDistrict={handleDistrictChange}
                onChangeWard={handleWardChange}
              />
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
