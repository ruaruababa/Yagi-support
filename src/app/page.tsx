'use client';

import { Tag } from 'antd';
import Head from 'next/head';
import { useMemo } from 'react';
import '@/lib/env';

import UnderlineLink from '@/components/links/UnderlineLink';

import ListNeedSupport from '@/app/components/list-need-support';

import CanSupportForm from './components/add-can-support-form';
import AddConnectGovForm from './components/add-connect-gov-from';
import NeedSupportForm from './components/add-need-support-form';
import SupportStayForm from './components/add-support-stay-form';
import ConnectGovPage from './components/connect-gov';
import Filter from './components/filter';
import ListCanSupport from './components/list-can-support';
import ListSupportStay from './components/list-support-stay';
import useSupportYagi from './hooks/useSupportYagi';
import { tags } from './services/types';
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
          <ListNeedSupport
            data={needs}
            handleUpdateNeedStatus={handleUpdateNeedStatus}
          />
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
