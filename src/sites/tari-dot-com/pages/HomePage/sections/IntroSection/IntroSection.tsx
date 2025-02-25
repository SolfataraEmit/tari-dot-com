'use client';

import DownloadButton from './DownloadButton/DownloadButton';
import {
    Wrapper,
    EyebrowWrapper,
    EyebrowText,
    EyebrowPill,
    Text,
    ContentWrapper,
    MainImage,
    Holder,
    TitleWrapper,
    Title,
} from './styles';
import mainImage from './images/main-image.png';
import TitleAnimation from '@/components/TitleAnimation/TitleAnimation';

export default function IntroSection() {
    return (
        <Wrapper>
            <Holder>
                <MainImage src={mainImage.src} alt="" />

                <ContentWrapper>
                    <EyebrowWrapper>
                        <EyebrowText>
                            <TitleAnimation
                                text={`Making mining accessible for`}
                                initialDelay={0}
                                staggerDelay={0.03}
                            />
                        </EyebrowText>
                        <EyebrowPill>everyone</EyebrowPill>
                    </EyebrowWrapper>

                    <TitleWrapper>
                        <Title>
                            <TitleAnimation text={`Put your device to work earning steady income`} initialDelay={400} />
                        </Title>

                        <Text>
                            <TitleAnimation
                                text={`Tari Universe is the easiest to use tool in the web3 space. Earn XTM in 3 clicks and you don’t have to give up your personal information.`}
                                initialDelay={1400}
                                staggerDelay={0.03}
                            />
                        </Text>
                    </TitleWrapper>

                    <DownloadButton />
                </ContentWrapper>
            </Holder>
        </Wrapper>
    );
}
