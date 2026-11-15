
import type { WheelOption } from '../../types/wheel';
import styles from './Wheel.module.css';

interface WheelProps {
    options: WheelOption[];
    rotation: number;
    onSpinEnd: () => void;
}

const COLORS = [
    '#7C5CFC',
    '#FF8A65',
    '#4ECDC4',
    '#FFC857',
    '#5B8DEF',
    '#F06292',
    '#8BCB88',
    '#A78BFA',
];

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 180;
const LABEL_RADIUS = 115;

function getCoordinates(angle: number, radius: number) {
    const radians = (angle * Math.PI) / 180;

    return {
        x: CENTER + radius * Math.cos(radians),
        y: CENTER + radius * Math.sin(radians),
    };
}

function createSectorPath(startAngle: number, endAngle: number) {
    const start = getCoordinates(startAngle, RADIUS);
    const end = getCoordinates(endAngle, RADIUS);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
        `M ${CENTER} ${CENTER}`,
        `L ${start.x} ${start.y}`,
        `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
        'Z',
    ].join(' ');
}

function normalizeTextRotation(angle: number) {
    const rotation = ((angle + 90) % 360 + 360) % 360;

    return rotation > 90 && rotation < 270
        ? rotation + 180
        : rotation;
}

export function Wheel({
                          options,
                          rotation,
                          onSpinEnd,
                      }: WheelProps) {
    const sliceAngle = 360 / Math.max(options.length, 1);

    const handleTransitionEnd = (
        event: React.TransitionEvent<SVGGElement>
    ) => {
        if (
            event.propertyName === 'transform' &&
            event.target === event.currentTarget
        ) {
            onSpinEnd();
        }
    };

    return (
        <div className={styles.container}>
            <svg
                className={styles.wheel}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                role="img"
                aria-label="Колесо вариантов выбора"
            >
                <g
                    className={styles.rotatingGroup}
                    style={{transform: `rotate(${rotation}deg)`}}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS + 5}
                        fill="#FFFFFF"
                    />

                    {options.length === 0 && (
                        <circle
                            cx={CENTER}
                            cy={CENTER}
                            r={RADIUS}
                            fill="#E9E6F1"
                        />
                    )}

                    {options.length === 1 && (
                        <circle
                            cx={CENTER}
                            cy={CENTER}
                            r={RADIUS}
                            fill={COLORS[0]}
                        />
                    )}

                    {options.map((option, index) => {
                        const startAngle = -90 + index * sliceAngle;
                        const endAngle = startAngle + sliceAngle;
                        const middleAngle = startAngle + sliceAngle / 2;

                        const labelPosition = getCoordinates(
                            middleAngle,
                            LABEL_RADIUS
                        );

                        const textRotation = normalizeTextRotation(
                            middleAngle
                        );

                        return (
                            <g key={option.id}>
                                <path
                                    d={createSectorPath(startAngle, endAngle)}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                />

                                <text
                                    x={labelPosition.x}
                                    y={labelPosition.y}
                                    fill="#FFFFFF"
                                    fontSize={Math.min(16, 200 / options.length)}
                                    fontWeight="600"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${textRotation} ${labelPosition.x} ${labelPosition.y})`}
                                >
                                    {option.label.length > 16
                                        ? `${option.label.slice(0, 14)}…`
                                        : option.label}
                                </text>
                            </g>
                        );
                    })}

                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r="27"
                        fill="#FFFFFF"
                        stroke="#E5E1F2"
                        strokeWidth="3"
                    />

                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r="9"
                        fill="#7C5CFC"
                    />
                </g>

                {/* Неподвижный указатель */}
                <path d="M 200 43 L 181 5 L 219 5 Z" fill="#24212D" stroke="#FFFFFF" strokeWidth="3"></path>

            </svg>
        </div>
    );
}
