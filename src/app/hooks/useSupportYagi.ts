import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, notification } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useCallback, useMemo, useState } from 'react';

import { CACHE_LOCATION_TIME, DEFAULT_PROVINCE } from '@/constant/const';

import { createConnectGov, getConnectGov } from './../services/connect-gov';
import useDebounce from './useDebounce';
import { createCanSupport, getCans } from '../services/can-support';
import { getDistricts, GetDistrictsQueries } from '../services/district';
import {
  createNeedSupport,
  getNeeds,
  NeedSupportQueries,
  updateNeedStatus,
} from '../services/need-support';
import { getProvinces } from '../services/province';
import { createStaySupport, getStaySupport } from '../services/stay-support';
import { tags, TagType } from '../services/types';
import { getWards, GetWardsQueries } from '../services/ward';

const useSupportYagi = () => {
  const [form] = Form.useForm();
  const province = useWatch('province', form) || DEFAULT_PROVINCE;
  const district = useWatch('district', form);
  const ward = useWatch('ward', form);
  const [activeTab, setActiveTab] = useState<TagType>(tags[2]);
  const queryClient = useQueryClient();

  const [districtQueries, setDistrictQueries] = useState<GetDistrictsQueries>({
    province_code: DEFAULT_PROVINCE,
    limit: 200,
    page: 1,
  });
  const [wardQueries, setWardQueries] = useState<GetWardsQueries>({
    limit: 200,
    page: 1,
  });

  const [neeedQueries, setNeedQueries] = useState<NeedSupportQueries>({
    province: DEFAULT_PROVINCE,
  });

  const [canQueries, setCanQueries] = useState<NeedSupportQueries>({
    province: DEFAULT_PROVINCE,
  });

  const [stayQueries, setStayQueries] = useState<NeedSupportQueries>({
    province: DEFAULT_PROVINCE,
  });

  const [govQueries, setGovQueries] = useState<NeedSupportQueries>({
    province: DEFAULT_PROVINCE,
    status: false,
  });

  const getWardQueries = useDebounce(wardQueries, 300);
  const getDistrictQueries = useDebounce(districtQueries, 300);
  const getNeedQueries = useDebounce(neeedQueries, 300);
  const getCansQueries = useDebounce(canQueries, 300);
  const getStaySupportQueries = useDebounce(stayQueries, 300);
  const getConnectGovQueris = useDebounce(govQueries, 300);

  const handleTabSwitch = (tab: TagType) => {
    setActiveTab(tab);
  };

  const { data: provinceData } = useQuery({
    queryKey: ['provinces'],
    queryFn: () =>
      getProvinces({
        limit: 100,
      }),
    staleTime: CACHE_LOCATION_TIME,
  });

  const provinces = useMemo(() => {
    if (!provinceData) return [];
    return provinceData.results;
  }, [provinceData]);

  const { data: districtData } = useQuery({
    queryKey: ['districts', getDistrictQueries],
    queryFn: () => getDistricts(getDistrictQueries),
    enabled: !!getDistrictQueries.province_code || !!province,
    staleTime: CACHE_LOCATION_TIME,
  });

  const districts = useMemo(() => {
    if (!districtData) return [];
    return districtData.results;
  }, [districtData]);

  const { data: wardData } = useQuery({
    queryKey: ['wards', getWardQueries],
    queryFn: () => getWards(getWardQueries),
    enabled:
      !!getWardQueries.district_code ||
      !!getWardQueries.province_code ||
      !!district,
    staleTime: CACHE_LOCATION_TIME,
  });

  const wards = useMemo(() => {
    if (!wardData) return [];
    return wardData.results;
  }, [wardData]);

  const handleProvinceChange = useCallback((value: string) => {
    setDistrictQueries((pre) => ({ ...pre, province_code: value }));
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, province: value }));
        break;
      default:
        break;
    }
  }, []);

  const handleDistrictChange = useCallback((value: string) => {
    setWardQueries((pre) => ({ ...pre, district_code: value }));
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, district: value }));
        break;
      default:
        break;
    }
  }, []);
  const handleWardChange = useCallback((value: string) => {
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, ward: value }));
        break;
      default:
        break;
    }
  }, []);

  const { data: needData } = useQuery({
    queryKey: ['getNeedQueries', getNeedQueries],
    queryFn: () => getNeeds(getNeedQueries),
    enabled: activeTab.key === 'list-need-support',
  });

  const { data: canData } = useQuery({
    queryKey: ['getCansQueries', getCansQueries],
    queryFn: () => getCans(getCansQueries),
    enabled: activeTab.key === 'list-support-teams',
  });

  const { data: stayData } = useQuery({
    queryKey: ['getStaySupportQueries', getStaySupportQueries],
    queryFn: () => getStaySupport(getStaySupportQueries),
    enabled: activeTab.key === 'list-accommodations',
  });

  const { data: govData } = useQuery({
    queryKey: ['getConnectGovQueris', getConnectGovQueris],
    queryFn: () => getConnectGov(getConnectGovQueris),
    enabled: activeTab.key === 'connect-authorities',
  });

  const needs = useMemo(() => {
    if (!needData) return [];
    return needData.results;
  }, [needData]);

  const cans = useMemo(() => {
    if (!canData) return [];
    return canData.results;
  }, [canData]);

  const stays = useMemo(() => {
    if (!stayData) return [];
    return stayData.results;
  }, [stayData]);

  const govs = useMemo(() => {
    if (!govData) return [];
    return govData.results;
  }, [govData]);

  const { mutate: createNeedMutate } = useMutation({
    mutationFn: createNeedSupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Tạo yêu cầu hỗ trợ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getNeedQueries', getNeedQueries],
      });
    },
  });

  const { mutate: createCanMutate } = useMutation({
    mutationFn: createCanSupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm đoàn hỗ trợ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getCansQueries', getCansQueries],
      });
    },
  });

  const { mutate: createStaySupportMutate } = useMutation({
    mutationFn: createStaySupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm chỗ ăn nghỉ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getStaySupportQueries', getStaySupportQueries],
      });
    },
  });

  const { mutate: createConnectGovMutate } = useMutation({
    mutationFn: createConnectGov,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm thông tin kết nối chính quyền thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getConnectGovQueris', getConnectGovQueris],
      });
    },
  });

  const { mutate: updateNeedStatusMutate } = useMutation({
    mutationFn: updateNeedStatus,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Cập nhật trạng thái thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getNeedQueries', getNeedQueries],
      });
    },
  });

  const onSubmit = useCallback(
    (values: any) => {
      switch (activeTab.key) {
        case 'add-support-info':
          createNeedMutate(values);
          break;
        case 'add-support-teams-info':
          createCanMutate(values);
          break;
        case 'add-accommodations-info':
          createStaySupportMutate(values);
          break;
        case 'add-connect-authorities':
          createConnectGovMutate(values);
          break;
        default:
          break;
      }
    },
    [
      createNeedMutate,
      createCanMutate,
      createStaySupportMutate,
      createConnectGovMutate,
    ],
  );

  const handleUpdateNeedStatus = useCallback((id: string, status: boolean) => {
    updateNeedStatusMutate({ id, status });
  }, []);

  return {
    provinces,
    districts,
    wards,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
    handleTabSwitch,
    onSubmit,
    handleUpdateNeedStatus,
    activeTab,
    form,
    needs,
    cans,
    stays,
    govs,
  };
};

export default useSupportYagi;
